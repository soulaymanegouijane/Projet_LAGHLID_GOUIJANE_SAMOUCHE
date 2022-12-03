package com.projet.exception;

public class MaterialNotFoundException extends Exception{
    public MaterialNotFoundException() {
        super();
    }

    public MaterialNotFoundException(String message) {
        super(message);
    }

    public MaterialNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaterialNotFoundException(Throwable cause) {
        super(cause);
    }
}
