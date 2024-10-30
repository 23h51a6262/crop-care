//package week_7;
import java.awt.*;
import java.awt.event.*;

public class Window_Example extends Frame {
    Window_Example() {
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
        
        setSize(400, 400);
        setLayout(null);
        setVisible(true);
    }

    public static void main(String[] args) {
        new Window_Example();
    }
}
