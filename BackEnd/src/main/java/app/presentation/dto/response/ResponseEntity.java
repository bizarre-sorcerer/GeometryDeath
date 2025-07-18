package app.presentation.dto.response;

public class ResponseEntity<T> {
    public String status;
    public String message;
    public T data;

    public ResponseEntity(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> ResponseEntity<T> success(T data) {
        return new ResponseEntity<>("success", null, data);
    }

    public static <T> ResponseEntity<T> error(String message) {
        return new ResponseEntity<>("error", message, null);
    }
}
