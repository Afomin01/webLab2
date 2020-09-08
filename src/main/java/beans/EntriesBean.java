package beans;

import java.util.List;

public class EntriesBean {
    private List<Entry> entries;

    public EntriesBean() {
    }

    public EntriesBean(List<Entry> entries) {
        this.entries = entries;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
}
