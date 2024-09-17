export default function Validation () {
    const errors = {}

    if (values.firstname === ""){
        errors.firstname ="Name is Required!";
    }

    if (values.lastname === ""){
        errors.lastname ="Name is Required!";
    }

    if (values.streetAddress === ""){
        errors.streetAddress ="Adderss is Required!";
    }

    if (values.city === ""){
        errors.city ="city is Required!";
    }

    if (values.country === ""){
        errors.country ="country is Required!";
    }

    if (values.zipCode === ""){
        errors.zipCode ="zipCode is Required!";
    }

    if (values.telephone === ""){
        errors.telephone ="telephone is Required!";
    }

    
    if (values.cardNumber === ""){
        errors.cardNumber ="cardNumber is Required!";
    }

    
    if (values.securityCode === ""){
        errors.securityCode ="securityCode is Required!";
    }

    
    if (values.expMonth === ""){
        errors.expMonth ="expMonth is Required!";
    }

      
    if (values.expYear === ""){
        errors.expYear ="expYear is Required!";
    }

    if (values.cardName === ""){
        errors.cardName ="cardName is Required!";
    }
    return errors;

}