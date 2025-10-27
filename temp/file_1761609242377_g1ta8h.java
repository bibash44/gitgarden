// Generated Java File
// navigate wireless card

import java.util.UUID;
import java.time.LocalDateTime;

public class alarmProcessor {
private final String id;
private final String name;

public alarmProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Lind Inc";
}

public String rebootData() {
    String data = "You can't reboot the card without transmitting the back-end PCI sensor!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    alarmProcessor processor = new alarmProcessor();
    String result = processor.rebootData();
    System.out.println("Result: " + result);
}
}