// Generated Java File
// copy digital port

import java.util.UUID;
import java.time.LocalDateTime;

public class cardProcessor {
private final String id;
private final String name;

public cardProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Strosin Inc";
}

public String generateData() {
    String data = "Try to connect the SQL panel, maybe it will input the bluetooth port!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    cardProcessor processor = new cardProcessor();
    String result = processor.generateData();
    System.out.println("Result: " + result);
}
}