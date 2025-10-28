// Generated Java File
// generate back-end interface

import java.util.UUID;
import java.time.LocalDateTime;

public class portProcessor {
private final String id;
private final String name;

public portProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Connelly LLC";
}

public String connectData() {
    String data = "You can't transmit the interface without connecting the back-end COM program!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    portProcessor processor = new portProcessor();
    String result = processor.connectData();
    System.out.println("Result: " + result);
}
}