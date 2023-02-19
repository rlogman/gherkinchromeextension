# Gherkin Chrome Extension for Shortcut
I created a simple Chrome extension to visually enhance the Shortcut user stories that use Gherkin. Installation instructions below.

The extension highlights anything that is between the markers `^~` and `~^`. For example, this text:

```
^~
Scenario: Fantastic option is selected and the user clicks next
Given all the Fantastic information is displayed after this platform is selected
When the user clicks next
Then the user will be directed to the "Review Details" page
And see the Fantastic logo in the platform field
And the "Account Size" section on the "Review Details" page (see link below)
~^
```

Is shown with the "Scenario", "Given", "When", "Then", and "And" words highlighted.

## Installation

Go to the project root and execute:
```bash
gulp
```

That command will generate a file located at `dist/gherkin-shortcut-highlighter-extension.zip`.

- Expand it anywhere in your computer.
- Type `chrome://extensions` in your Chrome's location bar.
- Enable Developer mode on the top-right area of that screen.
- Click the "Load unpacked" button
- Select the directory where you expanded the downloaded file.
- Go to a story with Gherkin syntax to test.

And that's everything. From this point on, whenever you open a Shortcut story that has Gherkin code between `^~`
and `~^`, it will display them with the highlighted syntax.
