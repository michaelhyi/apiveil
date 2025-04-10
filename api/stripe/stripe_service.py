import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
PRICE_ID = os.getenv("STRIPE_PRICE_ID")

class StripeService:
    @staticmethod
    def create_checkout_session(name: str, amount: int, origin: str):
        session = stripe.checkout.Session.create(
            submit_type='subscribe',
            mode='subscription',
            payment_method_types=['card'],
            line_items=[
                {
                    'price': PRICE_ID,
                    'quantity': 1,
                },
            ],
            success_url=f"{origin}/result?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{origin}/result?session_id={{CHECKOUT_SESSION_ID}}",
        )

        return session
        