/* MIT License
 *
 * Copyright (c) 2024 Etherspot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import TokenSelector from './Components/TokenSelector';
import SendNativeToken from './Components/SendNativeToken';

const components = [
  {
    title: 'Send Native Token: <SendNativeToken />',
    description:
      'SendNativeTokenUI component provides a UI for sending native crypto tokens to another Ethereum address using the EtherspotTransactionKit. This user-friendly interface is designed to simplify the complex underlying transaction mechanics, making it accessible to users who may not be familiar with the intricacies of blockchain transactions.',
    component: <SendNativeToken />,
  },
  {
    title: 'Token Selector: <TokenSelector />',
    description:
      'TokenSelector component provides a UI for list of tokens in dropdown. Shows tokens as per chainId. @param onSelect to easily we can import multiple tokens. We can customize dropdown UI as per our expectation.',
    component: <TokenSelector />,
  },
];

const App = () => {
  return (
    <div className="flex w-full h-full" style={style.container}>
      <span style={style.title}>{'Etherspot UI Components'}</span>
      {components.map(({ title, description, component }) => {
        return (
          <div key={title} className="flex" style={style.listMainContainer}>
            <div style={style.leftContainer}>
              <span style={style.componentTitle}>{title || 'Title'}</span>
              <div className="flex" style={style.descriptionContainer}>
                <span style={style.dot}>•</span>
                <span style={style.description}>{description || 'Description'}</span>
              </div>
            </div>
            <div className="flex w-full h-full" style={style.component}>
              {component || 'Component'}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default App;

const style: any = {
  container: {
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    overflowY: 'scroll',
  },
  listMainContainer: {
    backgroundImage: 'linear-gradient(to right, lightblue, violet)',
    borderColor: 'violet',
    borderWidth: '1px',
    width: '96%',
    minHeight: '20px',
    margin: '2%',
    padding: '1%',
    paddingBottom: '2%',
    borderRadius: '14px',
  },
  leftContainer: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingRight: '2%',
    borderRightWidth: '1px',
    borderColor: 'lightblue',
    flexDirection: 'column',
  },
  title: {
    alignSelf: 'center',
    marginTop: '20px',
    fontSize: '40px',
    fontWeight: 'bold',
  },
  componentTitle: { fontSize: '24px', fontWeight: 'bold' },
  descriptionContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: '2%',
  },
  dot: {
    fontSize: '18px',
    marginRight: '5px',
  },
  description: {
    fontSize: '16px',
  },
  component: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
  },
};
