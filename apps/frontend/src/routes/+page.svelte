<script lang="ts"> 
  import { client } from "$lib/utils/api";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";

  let data: string;
  let data1: string;
  let data2: string = '';
  let input: number = 718;

  interface Person {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  //타입스크립트는 let [변수][:자료형] = value, 이런식으로 자료형을 명시한다. 하지 않아도 타입을 추론해주기는 하지만 하는걸 추천
  let person: Person ={ 
    id : 0,
    name: '',
    age: 0,
    email: ''
  };

  let personInfo:Person = {
    id:0,
    name: '',
    age: 0,
    email:''
  };

  async function savePerson(){
    personInfo = { ...person }
    const res2 = await client.userInfo.$post({json:{ personInfo }});
    data2 = await res2.json();
  }
  
  //여기서 서버와 상호작용이 발생한다.(onMount 내부에서.)
  onMount(async () => {
    const res = await client.testRoute.$get();
    data = await res.json();
  
    const res1 = await client.postTest.$post({json:{ input }});
    data1 = await res1.json();    
  });
</script>


<div>
  <h1>http 메세지 테스트</h1>
  <div id='getTest'>
    {data}
  </div>
  <br/>
  <div id='postTest'>
    `post를 통해 당신이 보낸 숫자는 ${data1}입니다.`
  </div>
</div>
<br/>

<div>
  <h1>종합 사용</h1>
  <label>
    학번:
    <input type="number" bind:value={person.id} />
  </label>
  <br/>

  <label>
    이름:
    <input type="text" bind:value={person.name} />
  </label>
  <br/>

  <label>
    나이:
    <input type="number" bind:value={person.age} />
  </label>
  <br/>

  <label>
    이메일:
    <input type="text" bind:value={person.email} />
  </label>
  <br/>

  <button onclick={savePerson}>저장</button>
</div>

{#if data2 !==''}
  <p>{data2}</p>
{/if}

<nav>
	<a href="/">home</a>
	<a href="/lecture?id=2">lecture</a>
</nav>

