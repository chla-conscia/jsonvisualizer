import React from "react";
import Link from "next/link";
import { Flex, Group, Select, Button, useComputedColorScheme } from "@mantine/core";
import styled from "styled-components";
import toast from "react-hot-toast";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { type FileFormat, formats } from "../../../enums/file.enum";
import { JSONCrackLogo } from "../../../layout/JsonCrackLogo";
import useFile from "../../../store/useFile";
import useModal from "../../../store/useModal";
import { FileMenu } from "./FileMenu";
import { Logo } from "./Logo";
import { OptionsMenu } from "./OptionsMenu";
import { SearchInput } from "./SearchInput";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import { ZoomMenu } from "./ZoomMenu";
import { StyledToolElement } from "./styles";
import Image from 'next/image';

const StyledTools = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: flex;
  gap: 4px;
  justify-content: space-between;
  height: 70px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.TOOLBAR_BG};
  color: ${({ theme }) => theme.SILVER};
  z-index: 36;
  border-bottom: 1px solid ${({ theme }) => theme.SILVER_DARK};

  @media only screen and (max-width: 320px) {
    display: none;
  }
`;

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

interface ToolbarProps {
  isWidget?: boolean;
}

export const Toolbar = ({ isWidget = false }: ToolbarProps) => {
  const setVisible = useModal(state => state.setVisible);
  const setFormat = useFile(state => state.setFormat);
  const format = useFile(state => state.format);
  const colorScheme = useComputedColorScheme();
  const logoSrc = colorScheme === 'dark' ? '/assets/conscia_JV_dark.svg' : '/assets/conscia_JV_light.svg';

  return (
    <StyledTools>
      {isWidget && <Logo />}
      {!isWidget && (
        <Group gap="s" align="center" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>
          <Select
            defaultValue="json"
            size="xs"
            value={format}
            onChange={e => setFormat(e as FileFormat)}
            miw={80}
            w={120}
            data={formats}
            allowDeselect={false}
          />

          <FileMenu />
          <ViewMenu />
          <ToolsMenu />
        </Group>
      )}
      <Group gap="6" align="center" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>
        <SearchInput />
        {!isWidget && (
          <>
            <StyledToolElement
              title="Save as Image"
              onClick={() => setVisible("DownloadModal", true)}
            >
              <FiDownload size="18" />
            </StyledToolElement>
            <ZoomMenu />
            <OptionsMenu />
            <StyledToolElement title="Fullscreen" $hide={isWidget} onClick={fullscreenBrowser}>
              <AiOutlineFullscreen size="18" />
            </StyledToolElement>
            <StyledToolElement title="Conscia JSON Visualiser">
            <Flex gap="xs" align="center" justify="center" style={{ height: "100%" }}>
              <Image src={logoSrc} alt="Conscia JSON Visualiser" width={130} height={50} />
            </Flex>
            </StyledToolElement>
          </>
        )}
      </Group>
    </StyledTools>
  );
};