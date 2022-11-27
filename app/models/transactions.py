# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import User

class Transaction(db.Model):
    __tablename__ = "transactions"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    request_amount = db.Column(db.Integer)
    pay_amount = db.Column(db.Integer)
    is_Pending = db.Column(db.Boolean)

    # May need to add a decline Column(boolean) to take into account if a user wants to deny the request or the payment

    # wallet_transaction = db.relationship("Wallet", back_populates="transaction")
    sender = db.relationship("Wallet", foreign_keys=[sender_id])
    receiver = db.relationship("Wallet", foreign_keys=[receiver_id])

    def request_to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'request_amount': self.request_amount,
            'is_Pending': self.is_Pending
        }

    def username_to_dict(self):
        sender = User.query.get(self.sender_id)
        print(sender)
        print(sender.username)
        sender = sender.username
        receiver = User.query.get(self.receiver_id)
        print(receiver)
        print(receiver.username)
        receiver = receiver.username

        
        return {
            
            'id': self.id,
            'sender_id': sender,
            'receiver_id': receiver,
            'request_amount': self.request_amount,
            'is_Pending': self.is_Pending
        
        }
