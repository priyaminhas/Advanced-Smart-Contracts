# ProxyDelegate


## Getting started

Clone this repository

```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./proxy-delegate && cd ./proxy-delegate && git filter-branch --prune-empty --subdirectory-filter ./notes/contract-interaction/lab/proxy-delegate HEAD && rm -rf ./.git
```
^^^ Stack Overflow : [https://stackoverflow.com/a/11835214](https://stackoverflow.com/a/11835214)

Following the steps to complete this exercise:
1. clone this project
2. install packages: ```yarn```
3. run the test: ```yarn test```
4. make sure only 1 test case fails, the one that set version
5. fix the failed test case by modifying the ProxyDelegate.sol contract, e.g. add a version state variable in `ProxyDelegate.sol`
6. add a new Proxy contract which will use `.call()` instead of `.delegatecall()`
7. write test cases for the new Proxy contract to test `getMsgSender()` and `setVersion()`. Do you notice any differences between `call()` and `delegatecall()`?
8. Zip the project and submit on black board. Do not zip with `node_modules`, you'll receive 0. (but you can re-submit)
