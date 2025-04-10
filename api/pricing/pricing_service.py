from api.stripe.stripe_service import StripeService

class PricingService:
    @staticmethod
    def subscribe_to_enterprise_plan(origin: str):
        name = "APIVeil Enterprise Plan"
        amount = 20
        session = StripeService.create_checkout_session(name, amount, origin)
        return session.id
