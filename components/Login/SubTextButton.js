import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';

const SubTextButton = ({text, onPress}) => {
    const { colors } = useTheme();

    return (
        <Container onPress={onPress}>
            <InnerText style={{color: colors.gray500}}>{text}</InnerText>
        </Container>
    )
}

export default SubTextButton;

//styled
const Container = styled.TouchableOpacity`
    margin: 20px;
`;

const InnerText = styled.Text`
    font-size: 18px;
    text-align: center;
`;