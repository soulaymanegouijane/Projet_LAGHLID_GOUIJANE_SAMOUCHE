package com.projet.exception;

public class DemandNotFoundException extends Exception {
    public DemandNotFoundException() {
        super();
    }

    public DemandNotFoundException(String message) {
        super(message);
    }

    public DemandNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DemandNotFoundException(Throwable cause) {
        super(cause);
    }
}
