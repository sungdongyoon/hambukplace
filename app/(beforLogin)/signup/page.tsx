"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import { useSignup } from "@/hooks/muataions/useSignupMutation";
import { SignupType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();

  const [signupValue, setSignupValue] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });

  const signupMutation = useSignup();

  const handleSignupSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupValue.email) {
      alert("이메일을 입력해주세요");
      return;
    }

    if (!signupValue.name) {
      alert("이름을 입력해주세요");
      return;
    }

    if (!signupValue.password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (confirm("회원가입을 진행하시겠습니까?")) {
      signupMutation.mutate(signupValue, {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다");
          router.replace("/");
        },
        onError: (error) => {
          console.error("회원가입 실패", error);
          alert("회원가입에 실패했습니다");
        },
      });
    }
  };

  return (
    <section>
      <PageTitle>회원가입</PageTitle>
      <form className="w-60" onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            value={signupValue.email}
            required
            onChange={(e) =>
              setSignupValue((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            placeholder="이름을 입력해주세요"
            value={signupValue.name}
            required
            onChange={(e) =>
              setSignupValue((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={signupValue.password}
            required
            onChange={(e) =>
              setSignupValue((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <Button type="submit" size="sm" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "가입중..." : "회원가입"}
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
