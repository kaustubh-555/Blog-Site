#include <iostream>
using namespace std;
int main(){
    string a="a1a2ba2a1";
    int n=a.size();
    bool f=true;
    for(int i=0;i<n/2;i++){
        if(a[i]!=a[n-i-1]){
            f=false;
        }
    }
    if(f==true){
        cout<<"YES"<<endl;
    }
    return 0;
}