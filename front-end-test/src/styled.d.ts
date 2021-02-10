import 'styled-components';
import Colors from 'styles/Colors';
import Sizes from 'styles/Sizes';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    sizes: Sizes;
  }
}
