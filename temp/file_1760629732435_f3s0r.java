// Generated Java File
// parse back-end array

import java.util.UUID;
import java.time.LocalDateTime;

public class cardProcessor {
private final String id;
private final String name;

public cardProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Schumm Group";
}

public String back upData() {
    String data = "You can't program the card without programming the optical PCI panel!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    cardProcessor processor = new cardProcessor();
    String result = processor.back upData();
    System.out.println("Result: " + result);
}
}