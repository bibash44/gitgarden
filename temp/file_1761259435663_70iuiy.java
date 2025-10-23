// Generated Java File
// back up optical feed

import java.util.UUID;
import java.time.LocalDateTime;

public class sensorProcessor {
private final String id;
private final String name;

public sensorProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Rath - Bednar";
}

public String copyData() {
    String data = "Use the auxiliary HDD driver, then you can back up the 1080p hard drive!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    sensorProcessor processor = new sensorProcessor();
    String result = processor.copyData();
    System.out.println("Result: " + result);
}
}