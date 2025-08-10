import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

const App = () => {
    const [playerVal, setPlayerVal] = useState(null);
    const [computerVal, setComputerVal] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [compScore, setCompScore] = useState(0);
    const [winner, setWinner] = useState(null);

    const logic = (playerVal, computerVal) => {
        if (playerVal === computerVal) return 0;
        if (
            (playerVal === "ROCK" && computerVal === "SCISSORS") ||
            (playerVal === "SCISSORS" && computerVal === "PAPER") ||
            (playerVal === "PAPER" && computerVal === "ROCK")
        ) return 1;
        return -1;
    };

    const decision = (playerChoice) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"];
        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        const val = logic(playerChoice, compChoice);

        setPlayerVal(playerChoice);
        setComputerVal(compChoice);

        if (val === 1) {
            setPlayerScore(playerScore + 1);
            setWinner("player");
        } else if (val === -1) {
            setCompScore(compScore + 1);
            setWinner("computer");
        } else {
            setWinner("draw");
        }
    };

    const ChoiceButton = ({ label }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => decision(label)}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rock Paper Scissors</Text>

            <View style={styles.scoreBoard}>
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreTitle}>Player</Text>
                    <Text style={styles.scoreValue}>{playerScore}</Text>
                </View>
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreTitle}>Computer</Text>
                    <Text style={styles.scoreValue}>{compScore}</Text>
                </View>
            </View>

            {winner && (
                <Text style={[
                    styles.winnerText,
                    winner === "player" && { color: "#4CAF50" },
                    winner === "computer" && { color: "#FF5252" },
                    winner === "draw" && { color: "#FFC107" }
                ]}>
                    {winner === "draw" ? "It's a Draw!" : winner === "player" ? "You Win 🎉" : "Computer Wins 💻"}
                </Text>
            )}

            <View style={styles.choicesContainer}>
                <ChoiceButton label="ROCK" />
                <ChoiceButton label="PAPER" />
                <ChoiceButton label="SCISSORS" />
            </View>

            {(playerVal && computerVal) && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>You chose: {playerVal}</Text>
                    <Text style={styles.resultText}>Computer chose: {computerVal}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e2f",
        alignItems: "center",
        justifyContent: "center", // Centers everything vertically
        paddingHorizontal: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textTransform: "uppercase",
        textAlign: "center" // Center title text
    },
    scoreBoard: {
        flexDirection: "row",
        justifyContent: "center", // Center scoreboard
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
        gap: 20
    },
    scoreCard: {
        backgroundColor: "#2d2d44",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        width: 120,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        elevation: 5
    },
    scoreTitle: {
        color: "#aaa",
        fontSize: 16,
        marginBottom: 5
    },
    scoreValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff"
    },
    winnerText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    choicesContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginBottom: 30
    },
    button: {
        backgroundColor: "#6200ea",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 4
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    resultBox: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "#2d2d44",
        borderRadius: 10,
        alignItems: "center",
        width: "100%"
    },
    resultText: {
        color: "#fff",
        fontSize: 16,
        marginVertical: 5,
        textAlign: "center"
    }
});

export default App;
