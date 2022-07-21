import "@aws-amplify/ui-react/styles.css";
import Game from "./Game.js"
import "./App.css"
import {
    withAuthenticator,
    Button,
    Heading,
    Image,
    View,
    Card,
} from "@aws-amplify/ui-react";


function App({ signOut }) {
    return (
        <View className="App">
            <Button onClick={signOut}>Sign Out</Button>
            <Card className="amplify-card">
                {/* <Image src={logo} className="App-logo" alt="logo" /> */}
                {/* <Heading level={1}>We now have Auth!</Heading> */}
                <Game />
            </Card>

        </View>

    );
}

export default withAuthenticator(App);