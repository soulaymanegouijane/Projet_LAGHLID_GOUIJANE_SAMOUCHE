package com.projet.exception;

public class OfferNotFoundException extends Exception
{

    public OfferNotFoundException() {
        super();
    }

    public OfferNotFoundException(String message) {
        super(message);
    }

    public OfferNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public OfferNotFoundException(Throwable cause) {
        super(cause);
    }
}
