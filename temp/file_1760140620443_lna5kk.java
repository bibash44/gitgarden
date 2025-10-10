// Generated Java File
// reboot digital interface

import java.util.UUID;
import java.time.LocalDateTime;

public class alarmProcessor {
private final String id;
private final String name;

public alarmProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Morar, Jones and Schroeder";
}

public String copyData() {
    String data = "Try to generate the PNG monitor, maybe it will back up the 1080p hard drive!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    alarmProcessor processor = new alarmProcessor();
    String result = processor.copyData();
    System.out.println("Result: " + result);
}
}