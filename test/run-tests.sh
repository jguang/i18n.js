#!/bin/bash
echo Running tests with i18n.conf configuration...
java -jar JsTestDriver.jar --tests all --config i18n.conf --reset --captureConsole
