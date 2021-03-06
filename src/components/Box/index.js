import styled from "styled-components";

const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: ${props => props.theme.marginBottom};
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #6F92BB;
  }
  .atencaoValidacao {
      font-size: 12px;
      color:red;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 20px;
  }
  .btAcoes {
    display: flex;
    flex-wrap: wrap;
    gap:20px;
    margin-bottom: 20px;
  }
  .scrapsBox li{
    background-color: rgb(252, 255, 164);
    border-radius: 8px;
    margin:10px 0px;
    display: flex;
    flex-wrap:nowrap;
    align-items: center;
    gap:10px;
    & img {
      max-width: 100px;
      margin: 10px;
      height: 100%;
      border-radius:50%;
    }
    & div {
      display:flex;
      padding:10px;
      flex-direction: column;
      align-self: flex-start;
      & span:nth-child(1) {
        margin-top: 10px;
        font-size:14px;
        &  i {
          font-size: 12px;
          font-style:normal
        }
      }
      & span:nth-child(2) {
        color: #444;
        letter-spacing: 1px;
        margin-top:10px;
        font-size:12px;
      }
    }    
  }
`;


export const BoxTheme = {
  marginBottom: "20px",
};

export default Box;