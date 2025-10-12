// Generated Java File
// compress primary port

import java.util.UUID;
import java.time.LocalDateTime;

public class alarmProcessor {
private final String id;
private final String name;

public alarmProcessor() {
    this.id = UUID.randomUUID().toString();
    this.name = "Dicki, Steuber and Crooks";
}

public String back upData() {
    String data = "Try to reboot the SAS interface, maybe it will reboot the auxiliary port!";
    System.out.println("Processing: " + data);
    return data;
}

public static void main(String[] args) {
    alarmProcessor processor = new alarmProcessor();
    String result = processor.back upData();
    System.out.println("Result: " + result);
}
}