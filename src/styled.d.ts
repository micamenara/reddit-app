import 'styled-components';
import Colors from 'styles/Colors';
import Breakpoints from 'styles/Breakpoints';
import Sizes from 'styles/Sizes';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    sizes: Sizes;
    breakpoints: Breakpoints;
  }
}
