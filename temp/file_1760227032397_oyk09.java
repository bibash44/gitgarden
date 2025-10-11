// Generated Java File
// reboot cross-platform driver

import java.util.UUID;
import java.time.LocalDateTime;

public class cardProcessor {
private final String id;
private final String name;

public cardProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Kovacek - Ledner";
}

public String rebootData() {
    String data = "You can't reboot the driver without connecting the solid state SDD sensor!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    cardProcessor processor = new cardProcessor();
    String result = processor.rebootData();
    System.out.println("Result: " + result);
}
}