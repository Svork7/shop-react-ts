import Container from '../../helperComponentsStyled/Container'
import { FooterCategoryBlock } from './footerComponents/FooterCategoryBlock'
import { FooterContactsBlock } from './footerComponents/FooterContactsBlock'
import { FooterMainBlock } from './footerComponents/FooterMainBlock'
import { FooterMenuBlock } from './footerComponents/FooterMenuBlock'
import { FooterPriceListBlock } from './footerComponents/FooterPriceListBlock'
import { FooterStl } from './footer.styled'

export const Footer = () => {
  return (
    <FooterStl>
      <Container>
        <div className="footer__wrapper">
          <FooterMainBlock />
          <FooterMenuBlock />
          <FooterCategoryBlock />
          <FooterPriceListBlock />
          <FooterContactsBlock />
        </div>
      </Container>
    </FooterStl>
  )
}
