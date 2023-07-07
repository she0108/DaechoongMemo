import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';

const MainTextButton = ({text, onPress}) => {
    const { colors } = useTheme();

    return (
        <Container onPress={onPress}>
            <InnerText style={{color: colors.blue}}>{text}</InnerText>
        </Container>
    )
}

export default MainTextButton;

//styled
const Container = styled.TouchableOpacity`
    margin: 10px;
`;

const InnerText = styled.Text`
    font-size: 20px;
`;