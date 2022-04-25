import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("order")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      
      console.log(
        `SUCCESS: Order ${session.id} has been added to Firestore DB`
      );
    })
    .catch((err) => console.log("firebase error", err));
  
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //Verify the event is from Stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR in Verify", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    //Handle the checkout.session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fulfill order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => console.log("errrrr", err));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
