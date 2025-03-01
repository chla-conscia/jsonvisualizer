import React from "react";
import { useComputedColorScheme } from "@mantine/core";
import { JSONCrackLogo } from "../../../layout/JsonCrackLogo";
import { StyledToolElement } from "./styles";
import Image from 'next/image';

export const Logo = () => {
  const colorScheme = useComputedColorScheme();
  const logoSrc = colorScheme === 'dark' ? '/assets/conscia_JV_dark.svg' : '/assets/conscia_JV_light.svg';
  
  return (
    <StyledToolElement title="Conscia JSON Visualiser">
      <Image src={logoSrc} alt="Conscia JSON Visualiser" width={120} height={40} />
    </StyledToolElement>
  );
};