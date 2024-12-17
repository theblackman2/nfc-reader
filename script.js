if ("NDEFReader" in window) {
	console.log("Web NFC is supported in this browser.");
} else {
	alert("Web NFC is not supported in this browser.");
}

const writeButton = document.getElementById("write-button");
const valueInput = document.querySelector("input#value");
const displayValue = document.querySelector("p#value");

async function writeToNFC() {
	try {
		const ndef = new NDEFReader();
		await ndef.write(valueInput.value);
		alert("Successfully written to NFC!");
	} catch (error) {
		console.error("Error writing to NFC:", error);
		alert("Failed to write to NFC.");
	}
}

async function readFromNFC() {
	try {
		const ndef = new NDEFReader();
		await ndef.scan();
		alert("Scan started. Approach an NFC tag.");

		ndef.onreading = (event) => {
			const decoder = new TextDecoder();
			for (const record of event.message.records) {
				const text = decoder.decode(record.data);
				displayValue.textContent = text;
			}
		};

		ndef.onreadingerror = () => {
			console.error("Error reading from NFC tag.");
			alert("Error reading NFC. Try again.");
		};
	} catch (error) {
		console.error("Error starting scan:", error);
		alert("Failed to start NFC scan.");
	}
}

writeButton.addEventListener("click", writeToNFC);

readFromNFC();
