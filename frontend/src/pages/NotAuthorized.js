import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10% 0;
    gap: 3rem;
`
const SuccessImage = styled.i`color: #D14D72;`

const SuccessText = styled.p`
    color: #171b22;
    font-size: 1.275rem;
    font-weight: 600;
`

function SuccessPage(){
    // To navigate
    const location = useLocation();
    console.log(location);

    return (
        <Wrapper>
            <ContentWrapper>
                <SuccessImage className="successful-payment-img fa-sharp fa-solid fa-circle-xmark fa-6x"></SuccessImage>
                <SuccessText>You are not authorized for this action.</SuccessText>
            </ContentWrapper>
        </Wrapper>
    );
}

export default SuccessPage;