from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from django.utils.timezone import now
from .models import Customer, Product, Subscription
from .serializers import CustomerSerializer, ProductSerializer, SubscriptionSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F, Sum
import logging

logger = logging.getLogger('myapp')  # Use 'myapp' or your app's name

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def perform_create(self, serializer):
        customer = serializer.validated_data['customer']
        product = serializer.validated_data['product']
        active_subscriptions = Subscription.objects.filter(
            customer=customer, product=product, subscription_end_date__gte=now().date()
        )
        if active_subscriptions.exists():
            raise ValidationError("An active subscription already exists for this customer and product.")
        serializer.save()

    @action(detail=False, methods=['get'])
    def revenue(self, request):
        # Fetch all subscriptions (skip filter for now)
        subscriptions = Subscription.objects.all()

        # Log each subscription's details
        for sub in subscriptions:
            logger.info(f"ID: {sub.id}, Customer: {sub.customer_id}, Product: {sub.product.product_name}, End Date: {sub.subscription_end_date}")

        total_revenue = 0
        for sub in subscriptions:
            cost_per_user = sub.product.annual_subscription_cost_per_user
            users = sub.no_of_users_subscribed
            revenue_per_subscription = users * cost_per_user

            # Log the detailed calculation for each subscription
            logger.info(f"Subscription ID {sub.id} - {sub.product.product_name}: "
                         f"{users} users * {cost_per_user} = {revenue_per_subscription}")
            total_revenue += revenue_per_subscription

        logger.info(f"Total calculated revenue: {total_revenue}")

        return Response({
            "total_revenue": total_revenue,
            "adjustments": {
                "include_active": True  # Temporarily set to True for testing
            }
        })