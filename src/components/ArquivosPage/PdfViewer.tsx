import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  height: 100%;

  & iframe {
    width: 100%;
    height: 100%;
  }
`;

export default function PdfViewer({ url }: any) {
  return (
    <StyledDiv>
      <iframe src={`${url}#toolbar=0`} />
    </StyledDiv>
  );
}

// import { MapContainer } from "react-leaflet";
// import { TileLayer } from 'react-leaflet';

// export default function PdfViewer({ url }: any) {
//   return (
//     <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false} >
//       <TileLayer url={url} />

//     </MapContainer>
//   )
// }
