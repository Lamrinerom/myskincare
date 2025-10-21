<?php
function execPrint($command)
{
    $result = array();
    exec($command, $result);
    foreach ($result as $line) {
        print($line . "<br>");
    }
}
// Print the exec output inside of a pre element
print("<pre>" . execPrint("git pull https://Lamrinerom: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@github.com/Lamrinerom/myskincare.git main") . "</pre>");
?>
