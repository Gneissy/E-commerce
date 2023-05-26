import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

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
const SuccessImage = styled.i`color: #49ac5b;`

const SuccessText = styled.p`
    color: #171b22;
    font-size: 1.275rem;
    font-weight: 600;
`

function RegisterSuccessPage(){
    // To navigate
    const location = useLocation();
    console.log(location);

    return (
        <Wrapper>
            <ContentWrapper>
                <SuccessImage className="successful-payment-img fa-sharp fa-solid fa-circle-check fa-6x"></SuccessImage>
                <SuccessText>Welcome! Let's <Link to = "/login"> Login <i class="fa-solid fa-right-long"></i></Link>.</SuccessText>
            </ContentWrapper>
        </Wrapper>
    );
}

export default RegisterSuccessPage;