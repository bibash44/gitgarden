// Generated Java File
// generate optical system

import java.util.UUID;
import java.time.LocalDateTime;

public class cardProcessor {
private final String id;
private final String name;

public cardProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Streich - Klein";
}

public String back upData() {
    String data = "We need to compress the optical HDD alarm!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    cardProcessor processor = new cardProcessor();
    String result = processor.back upData();
    System.out.println("Result: " + result);
}
}