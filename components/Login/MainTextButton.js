import styled from 'styled-components/native';
import { color } from '../../color';

const MainTextButton = ({text, onPress}) => {

    return (
        <Container onPress={onPress}>
            <InnerText>{text}</InnerText>
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
    color: ${color.blue};
`;