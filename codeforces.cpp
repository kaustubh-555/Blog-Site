#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    multiset<int> ls;
    multiset<int> rs;
    while(t--){
        char c;
        cin>>c;
        if(c=='+'){
            int l,r;
            cin>>l>>r;
            ls.insert(l);
            rs.insert(r);
        }   
        else{
            int l,r;
            cin>>l>>r;
            ls.erase(ls.find(l));
            rs.erase(rs.find(r));
        } 
        if(ls.empty() or ls.size()==1){
            cout<<"NO"<<endl;
        }
        else{
            int low=*(ls.rbegin());
            int high=*(rs.begin());
            if(low>high){
                cout<<"YES"<<endl;
            }        
            else{
                cout<<"NO"<<endl;
            }

        }
    }
    return 0;
}