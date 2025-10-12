// Generated Java File
// connect back-end panel

import java.util.UUID;
import java.time.LocalDateTime;

public class panelProcessor {
private final String id;
private final String name;

public panelProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Hintz Inc";
}

public String inputData() {
    String data = "Use the solid state TCP sensor, then you can connect the auxiliary sensor!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    panelProcessor processor = new panelProcessor();
    String result = processor.inputData();
    System.out.println("Result: " + result);
}
}