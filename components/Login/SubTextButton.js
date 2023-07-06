import styled from 'styled-components/native';
import { color } from '../../color';

const SubTextButton = ({text, onPress}) => {

    return (
        <Container onPress={onPress}>
            <InnerText>{text}</InnerText>
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
    color: ${color.gray500};
    text-align: center;
`;