import * as R from "ramda";
import React, { Component } from "react";
import { Col, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";
import { Download } from "../Svgs/Download";
import { Trashcan } from "../Svgs/Trashcan";
import {
  StyledRow,
  DetailsRow,
  StyledTitle,
  CopyButton,
  StyledDate
} from "../Row/elements";
import { Copy } from "../Svgs/Copy";

const DownloadButton = styled.a`
  background-color: transparent;
  border: 0;
  color: ${props => props.theme.colors.gray300};
  outline: none;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:active,
  &:visited {
    color: ${props => props.theme.colors.gray300};
  }
  &:hover {
    color: ${props => props.theme.colors.gray500};
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: 0;
  color: ${props => props.theme.colors.gray300};
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  outline: none;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.gray500};
  }
`;

const Progress = styled.span`
  font-size: 0.8rem;
  text-align: right;

  color: ${props => props.theme.colors.blue500};
  &::after {
    font-size: 0.7rem;

    content: "%";
  }
`;

const RemoveCol = styled(Col)`
  width: 50px;
`;
const ProgressCol = styled(Col)`
  width: 50px;
  line-height: 1rem;
`;
const ActionsRow = styled(Row)`
  width: 50px;
`;

const urlnameParse = R.ifElse(
  R.pipe(R.length, R.lt(50)),
  R.pipe(
    R.converge(R.concat, [R.take(20), R.pipe(R.takeLast(20), R.concat("..."))])
  ),
  R.identity
);
export function copyToClipboard(text) {
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
}
class DownloadRow extends Component {
  render() {
    const { download, removeDownload, chromeDownload } = this.props;
    const progress = ((download.finished / download.total) * 100).toFixed(0);
    const date =
      new Date(download.created).toLocaleDateString() +
      " " +
      new Date(download.created).toLocaleTimeString();
    return (
      <StyledRow center="xs" middle="xs" between="xs">
        <DetailsRow>
          <Row start="xs">
            <StyledTitle title={download.title} xs={10}>
              {urlnameParse(download.title)}
            </StyledTitle>
            <CopyButton onClick={() => copyToClipboard(download.title)}>
              <Copy></Copy>
            </CopyButton>
          </Row>
          <Row start="xs">
            <StyledDate xs={12}>{`${date}`}</StyledDate>
          </Row>
        </DetailsRow>

        <ActionsRow>
          <ProgressCol>
            <Row middle="xs" center="xs">
              <div>
                {progress >= 100 ? (
                  <DownloadButton
                    // href={download.link}
                    onClick={() => {
                      chromeDownload(download);
                    }}
                    // download={`${download.title}.mp4`}
                  >
                    <Download />
                  </DownloadButton>
                ) : (
                  <Progress>{progress}</Progress>
                )}
              </div>
            </Row>
          </ProgressCol>
          <RemoveCol>
            <Row middle="xs" center="xs">
              <RemoveButton onClick={() => removeDownload(download.id)}>
                <Trashcan />
              </RemoveButton>
            </Row>
          </RemoveCol>
        </ActionsRow>
      </StyledRow>
    );
  }
}

export default DownloadRow;
