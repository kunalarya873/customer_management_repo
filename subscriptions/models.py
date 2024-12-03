from django.db import models

class Customer(models.Model):
    customer_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    pan = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    annual_subscription_cost_per_user = models.FloatField()

    def __str__(self):
        return self.product_name


class Subscription(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subscription_start_date = models.DateField()
    subscription_end_date = models.DateField()
    no_of_users_subscribed = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.customer.name} - {self.product.product_name}"
