import {Href, Link} from 'expo-router';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ButtonLinkProps {
    route: string;
    title: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({route, title}) => {
    return (
        <Link href={route as unknown as Href<string | object>} asChild>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
})

export default ButtonLink;