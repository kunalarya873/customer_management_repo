from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, ProductViewSet, SubscriptionViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'subscriptions', SubscriptionViewSet)


urlpatterns = router.urls
