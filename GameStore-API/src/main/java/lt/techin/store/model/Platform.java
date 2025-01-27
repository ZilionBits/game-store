package lt.techin.store.model;

public enum Platform {
    PC("PC"), MAC("Mac"), PLAYSTATION("PlayStation"), XBOX("Xbox"), LINUX("Linux"), NINTENDO("Nintendo"), ANDROID("Android");

    private final String code;

    Platform(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
