class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("faq") || lowerCaseMessage.includes("menu")) {
        this.actionProvider.displayFAQMenu();
        return;
      }
  
      const numberInput = message.trim();
      if (!isNaN(numberInput) && numberInput.length > 0) {
        this.actionProvider.handleFAQSelection(numberInput);
      } else {
 
        const message = this.actionProvider.createChatbotMessage("Please enter a valid number from the menu or type 'FAQ' to see the menu again.");
        this.actionProvider.addMessageToState(message);
      }
    }
  }
  
  export default MessageParser;
  