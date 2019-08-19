import styled from "styled-components"
import media from "../../global/mediaTemplates"

export default ({ className, style }) => (
  <Logo
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    enableBackground="new 0 0 100 100"
    version="1.1"
    viewBox="20 25 75 65"
    xmlSpace="preserve"
    className={className}
    style={style}
  >
    <g>
      <g>
        <g>
          <path d="M51.986,64.404L71.82,30.051H40.478l-9.917-17H14.986v2h14.426l8.75,15h-8.009l19.833,34.353v20.647h-11v2h24v-2h-11     V64.404z M68.356,32.051l-6.37,11.032v-0.032H48.061l-6.417-11H68.356z M33.617,32.051h5.712l6.417,11h-5.777L33.617,32.051z      M41.122,45.051h5.79l4.085,7.004l1.728-1.008l-3.498-5.996h11.623l-9.864,17.085L41.122,45.051z M71.005,12.949     c-7.73,0-14.019,6.102-14.019,14.102h2c0-7,5.387-12.102,12.014-12.102s12.014,5.308,12.014,11.935s-5.027,12.019-12.027,12.019     v2c8,0,14.027-6.247,14.027-13.977S78.734,12.949,71.005,12.949z" />
        </g>
      </g>
    </g>
  </Logo>
)

const Logo = styled.svg`
  height: 4rem;
  margin-right: 1rem;
  ${media.phone`
    height: 2.8rem;
  `};
  path {
    fill: #fff;
  }
`
