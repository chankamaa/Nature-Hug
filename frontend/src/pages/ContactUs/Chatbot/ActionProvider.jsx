import React from "react";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }

  displayFAQMenu = () => {
    const message = this.createChatbotMessage(
      "Please choose a number from the following FAQs:\n" +
      "1. What types of nature products do you sell?\n" +
      "2. How does the loyalty system work?\n" +
      "3. How can I track my order?\n" +
      "4. What are the payment options available?\n" +
      "5. Can I return or exchange a product?\n" +
      "6. Do you offer free shipping?\n" +
      "7. How can I contact customer support?\n" +
      "8. What are the benefits of creating an account?\n" +
      "9. How can I redeem my loyalty points?\n" +
      "10. Do you have any ongoing promotions or discounts?"
    );
    this.addMessageToState(message);
  };

  handleFAQSelection = (number) => {
    let responseMessage;
    switch (number) {
      case "1":
        responseMessage = "We offer a wide range of nature products, including organic skincare, eco-friendly household items, natural supplements, and more. Explore our shop for more details!";
        break;
      case "2":
        responseMessage = "Our loyalty system rewards you for every purchase! Earn points for every dollar spent, and redeem these points for discounts on future orders. You can check your points balance in your account.";
        break;
      case "3":
        responseMessage = "You can track your order by logging into your account and going to the 'Order History' section. You will also receive a tracking number via email once your order has been shipped.";
        break;
      case "4":
        responseMessage = "We accept various payment methods including credit/debit cards, PayPal, and other secure payment gateways. You can choose your preferred option at checkout.";
        break;
      case "5":
        responseMessage = "Yes, we have a 30-day return and exchange policy. Please visit our 'Returns & Exchanges' page for more information on how to initiate a return.";
        break;
      case "6":
        responseMessage = "Yes, we offer free shipping on orders over a certain amount. Please check our 'Shipping Information' page for the latest details on our shipping policies.";
        break;
      case "7":
        responseMessage = "You can contact our customer support team via email, phone, or live chat. We're here to help with any questions or concerns you may have!";
        break;
      case "8":
        responseMessage = "Creating an account allows you to track orders, earn loyalty points, save your favorite products, and receive exclusive offers and updates.";
        break;
      case "9":
        responseMessage = "You can redeem your loyalty points at checkout. Simply select the option to use your points, and the discount will be applied to your total.";
        break;
      case "10":
        responseMessage = "We often have special promotions and discounts. Be sure to sign up for our newsletter or check the 'Offers' section on our website to stay updated!";
        break;
      default:
        responseMessage = "Please enter a valid number from the menu.";
        break;
    }

    const message = this.createChatbotMessage(responseMessage);
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
